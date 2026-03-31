import { useState } from "react";
import {
  Modal,
  Button,
  NumberInput,
  Text,
  Group,
  Card,
  Title,
  Divider,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import classes from "./maxCalulators.module.css";


const CostOfDelay = () => {
  const [opened, { open, close }] = useDisclosure(false);



  // Default values
  const defaultValues = {
    monthlySIP: 10000,
    currentAge: 30,
    startingAge: 35,
    targetAge: 60,
    minReturn: 8,
    expectedReturn: 12,
    maxReturn: 20,
  };

  // Inputs
  const [monthlySIP, setMonthlySIP] = useState(defaultValues.monthlySIP);
  const [currentAge, setCurrentAge] = useState(defaultValues.currentAge);
  const [startingAge, setStartingAge] = useState(defaultValues.startingAge);
  const [targetAge, setTargetAge] = useState(defaultValues.targetAge);
  const [minReturn, setMinReturn] = useState(defaultValues.minReturn);
  const [expectedReturn, setExpectedReturn] = useState(
    defaultValues.expectedReturn,
  );
  const [maxReturn, setMaxReturn] = useState(defaultValues.maxReturn);

  // Results
  const [futureNow, setFutureNow] = useState<number | null>(null);
  const [futureLater, setFutureLater] = useState<number | null>(null);
  const [investedNow, setInvestedNow] = useState(0);
  const [investedLater, setInvestedLater] = useState(0);
  const [profitNow, setProfitNow] = useState(0);
  const [profitLater, setProfitLater] = useState(0);
  const [yearlyNow, setYearlyNow] = useState<number[]>([]);
  const [yearlyLater, setYearlyLater] = useState<number[]>([]);

  // Reset all inputs and results to defaults
  const resetAll = () => {
    setMonthlySIP(defaultValues.monthlySIP);
    setCurrentAge(defaultValues.currentAge);
    setStartingAge(defaultValues.startingAge);
    setTargetAge(defaultValues.targetAge);
    setMinReturn(defaultValues.minReturn);
    setExpectedReturn(defaultValues.expectedReturn);
    setMaxReturn(defaultValues.maxReturn);
    setFutureNow(null);
    setFutureLater(null);
    setInvestedNow(0);
    setInvestedLater(0);
    setProfitNow(0);
    setProfitLater(0);
    setYearlyNow([]);
    setYearlyLater([]);
  };

  // AMFI-style SIP calculation (month-end contributions)
  const calcSIP = (monthly: number, annualRate: number, months: number) => {
    const r = annualRate / 100 / 12; // monthly rate
    const total = (monthly * (Math.pow(1 + r, months) - 1)) / r; // FV formula
    return { total, invested: monthly * months };
  };

  const calculate = () => {
    // Input Validations
    if (
      monthlySIP <= 0 ||
      currentAge <= 0 ||
      startingAge <= currentAge ||
      targetAge <= startingAge ||
      minReturn < 0 ||
      minReturn > 12 ||
      expectedReturn < 8 ||
      expectedReturn > 25 ||
      maxReturn < 15 ||
      maxReturn > 40 ||
      !(minReturn < expectedReturn && expectedReturn < maxReturn) ||
      minReturn == 0
    ) {
      alert("Invalid inputs! Resetting to default values.");
      resetAll();
      return;
    }

    const monthsNow = (targetAge - currentAge) * 12;
    const monthsLater = (targetAge - startingAge) * 12;

    // SIP Now
    const nowExp = calcSIP(monthlySIP, expectedReturn, monthsNow);
    const nowMin = calcSIP(monthlySIP, minReturn, monthsNow);
    const nowMax = calcSIP(monthlySIP, maxReturn, monthsNow);
    setFutureNow(nowExp.total);
    setInvestedNow(nowExp.invested);
    setProfitNow(nowExp.total - nowExp.invested);
    setYearlyNow([nowMin.total, nowExp.total, nowMax.total]);

    // SIP Delayed
    const laterExp = calcSIP(monthlySIP, expectedReturn, monthsLater);
    const laterMin = calcSIP(monthlySIP, minReturn, monthsLater);
    const laterMax = calcSIP(monthlySIP, maxReturn, monthsLater);
    setFutureLater(laterExp.total);
    setInvestedLater(laterExp.invested);
    setProfitLater(laterExp.total - laterExp.invested);
    setYearlyLater([laterMin.total, laterExp.total, laterMax.total]);
  };

  const handleClose = () => {
    close();
    resetAll();
  };

  const barOptions: ApexOptions = {
    chart: { type: "bar" },
    plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
    xaxis: { categories: ["Min Return", "Expected Return", "Max Return"] },
    colors: ["#1b5e20", "rgb(60, 120, 110)"],
    legend: { position: "bottom" },
    dataLabels: { enabled: false },
    yaxis: {
      labels: {
        formatter: (val) => `${((val as number) / 1000).toFixed(0)}k`,
      },
    },
  };

  const barSeries = [
    { name: "SIP Now", data: yearlyNow },
    { name: "SIP Delayed", data: yearlyLater },
  ];

  const donutOptions = (title: string, total: number): ApexOptions => ({
    labels: ["Investment", "Profit"],
    colors: ["#1b5e20", "rgb(60, 120, 110)"], // dark green & softer blue
    legend: {
      position: "bottom",
      offsetY: 0, // move legend closer to chart
      horizontalAlign: "center",
      fontSize: "12px",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: { show: true, fontSize: "14px" },
            value: { show: true, fontSize: "14px" },
            total: {
              show: true,
              label: title,
              fontSize: "16px",
              fontWeight: 600,
              formatter: () => `₹${total.toLocaleString("en-IN")}`,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#fff"] },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: 250 },
          legend: { fontSize: "10px" },
        },
      },
    ],
  });

  return (
    <>
      <Card
        withBorder
        shadow="md"
        radius="md"
        p="lg"
        onClick={open}
        className={classes.card}
      >
        <Title order={4} className={classes.title}>
          COST OF DELAY SIP
        </Title>
        <Text size="sm" className={classes.subTitle} mt={5}>
          Compare investing now vs delayed start for maximum growth.
        </Text>
      </Card>

      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        size="90%"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        classNames={{ body: classes.modalBody, title: classes.modalTitle }}
      >
        <div className="px-1">
          <Title order={3} className={classes.heading2}>
            Cost of Delay SIP
          </Title>
          <button
            onClick={() => {
              close();
              setFutureNow(null);
            }}
            className="absolute top-3 right-3 bg-transparent border-0 outline-none shadow-none text-gray-600 hover:text-gray-900 text-lg cursor-pointer"
          >
            X
          </button>
        </div>

        <div className={classes.container}>
          <Text className={classes.subtext}>
            Compare investing now vs delayed SIP start to see lost potential.
          </Text>
          <Divider className={classes.divider} />

          <Stack gap="md" className={classes.inputSection}>
            <NumberInput
              label="Monthly SIP (₹)"
              value={monthlySIP}
              onChange={(v) => {
                setMonthlySIP(Number(v));
                setFutureNow(null);
              }}
            />
            <NumberInput
              label="Current Age"
              value={currentAge}
              onChange={(v) => {
                setCurrentAge(Number(v));
                setFutureNow(null);
              }}
            />

            <NumberInput
              label="Delayed Start Age"
              value={startingAge}
              onChange={(v) => {
                setStartingAge(Number(v));
                setFutureNow(null);
              }}
              min={currentAge + 1}
              max={targetAge - 1}
            />
            <NumberInput
              label="Target Age"
              value={targetAge}
              onChange={(v) => {
                setTargetAge(Number(v));
                setFutureNow(null);
              }}
            />

            <Group className={classes.inputSection3}>
              <NumberInput
                label="Min Return (%)"
                value={minReturn}
                onChange={(v) => {
                  setMinReturn(Number(v));
                  setFutureNow(null);
                }}
              />
              <NumberInput
                label="Expected Return (%)"
                value={expectedReturn}
                onChange={(v) => {
                  setExpectedReturn(Number(v));
                  setFutureNow(null);
                }}
              />
              <NumberInput
                label="Max Return (%)"
                value={maxReturn}
                onChange={(v) => {
                  setMaxReturn(Number(v));
                  setFutureNow(null);
                }}
              />
              <Group justify="center" mt="md" className={classes.inputSections}>
                <Button
                  color="green"
                  size="md"
                  onClick={calculate}
                  className={classes.mainButton}
                >
                  CALCULATE
                </Button>
              </Group>
            </Group>
          </Stack>

          {futureNow !== null && futureLater !== null && (
            <div className={classes.resultSection}>
              <Card
                withBorder
                shadow="sm"
                radius="md"
                className={classes.resultCard}
              >
                {" "}
                <Text className="text-lg text-center">
                  {`The cost of delay of ${startingAge - currentAge} ${
                    startingAge - currentAge > 1 ? "years" : "year"
                  } will be`}{" "}
                  <strong className="text-red-600">{`₹${(
                    futureNow - futureLater
                  ).toLocaleString("en-IN")}`}</strong>
                  . So to avoid it, contact{" "}
                  <strong>WealthPravah Prosperity Private Limited</strong> today
                  itself.
                </Text>{" "}
                <br></br>
                <Title order={2} className={classes.heading2}>
                  SIP Now Summary
                </Title>
                <div className={classes.summary}>
                  <div className={classes.summaryItem}>
                    <strong>Total Investment</strong>
                    <span>₹{investedNow.toLocaleString("en-IN")}</span>
                  </div>
                  <div className={classes.summaryItem}>
                    <strong>Total Profit</strong>
                    <span>₹{profitNow.toLocaleString("en-IN")}</span>
                  </div>
                  <div className={classes.summaryItem}>
                    <strong>Future Value</strong>
                    <span>
                      ₹
                      {futureNow.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
                <br></br>
                <Title order={2} className={classes.heading2}>
                  SIP Delayed Summary
                </Title>
                <div className={classes.summary}>
                  <div className={classes.summaryItem}>
                    <strong>Total Investment</strong>
                    <span>₹{investedLater.toLocaleString("en-IN")}</span>
                  </div>
                  <div className={classes.summaryItem}>
                    <strong>Total Profit</strong>
                    <span>₹{profitLater.toLocaleString("en-IN")}</span>
                  </div>
                  <div className={classes.summaryItem}>
                    <strong>Future Value</strong>
                    <span>
                      ₹
                      {futureLater.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
                <br></br>
                <div
                  className={`gap-2 ${classes.inputSection3}`}
                  style={{ overflow: "visible" }}
                >
                  {/* BAR CHART */}
                  <Card className={classes.focused}>
                    <Chart
                      options={barOptions}
                      series={barSeries}
                      type="bar"
                      height={300}
                    />
                  </Card>

                  {/* SIP Now DONUT */}
                  <Card className={classes.focused}>
                    <Chart
                      options={donutOptions("SIP Now", investedNow + profitNow)}
                      series={[investedNow, profitNow]}
                      type="donut"
                      height={300}
                    />
                  </Card>

                  {/* SIP Delayed DONUT */}
                  <Card className={classes.focused}>
                    <Chart
                      options={donutOptions(
                        "SIP Delayed",
                        investedLater + profitLater,
                      )}
                      series={[investedLater, profitLater]}
                      type="donut"
                      height={300}
                    />
                  </Card>
                </div>
              </Card>
              <div
                className={`text-gray-600 text-center ${classes.inputSections}`}
              >
                This all are estimated calculations do contact{" "}
                <strong>WealthPravah Prosperity Private Limited</strong> to get
                detail information and precise calculations.
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CostOfDelay;
