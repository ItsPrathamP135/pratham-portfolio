import { useState } from "react";
import {
  Modal,
  Button,
  NumberInput,
  Text,
  Group,
  Card,
  Title,
  Stack,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import classes from "./maxCalulators.module.css";

const EMICalculator = () => {
 
  const [opened, { open, close }] = useDisclosure(false);

  // Inputs
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenureYears, setTenureYears] = useState(5);

  // Results
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const [yearlyRemaining, setYearlyRemaining] = useState<number[]>([]);

  const calculateEMI = () => {
    let r;
    if (interestRate == 0) {
      setInterestRate(0.5);
      r = 0.5 / 12 / 100;
    } else {
      r = interestRate / 12 / 100;
    }

    const P = loanAmount;

    const n = tenureYears * 12;

    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPay = emiValue * n;
    const interest = totalPay - P;

    setEmi(emiValue);
    setTotalInterest(interest);
    setTotalPayment(totalPay);

    // Calculate yearly outstanding principal
    const remainingArr: number[] = [];
    for (let y = 1; y <= tenureYears; y++) {
      const k = y * 12; // months
      const remaining =
        P * Math.pow(1 + r, k) - emiValue * ((Math.pow(1 + r, k) - 1) / r);

      remainingArr.push(Math.max(remaining, 0));
    }
    setYearlyRemaining(remainingArr);
  };

  const doughnutOptions: ApexOptions = {
    labels: ["Principal", "Interest"],
    colors: ["#1b5e20", "rgb(60, 120, 110)"], // dark green & softer blue
    legend: {
      position: "bottom",
      offsetY: 0, // move legend closer to chart
      horizontalAlign: "center",
      fontSize: "12px",
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
  };

  const lineOptions: ApexOptions = {
    chart: { id: "remaining-chart", toolbar: { show: false } },
    xaxis: {
      categories: Array.from(
        { length: tenureYears },
        (_, i) => `Year ${i + 1}`
      ),
      labels: { style: { colors: "#555" } },
    },
    yaxis: {
      labels: { formatter: (val) => `${((val as number) / 1000).toFixed(0)}k` },
    },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#81c784", "#2e7d32", "#1b5e20"],
    grid: { borderColor: "#e0e0e0", strokeDashArray: 4 },
    tooltip: {
      y: {
        formatter: (val: number) => `₹${val.toLocaleString("en-IN")}`,
      },
    },
  };

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
          EMI CALCULATOR
        </Title>
        <Text size="sm" className={classes.subTitle} mt={5}>
          Calculate EMI, total interest, and outstanding balance with time.
        </Text>
      </Card>

      {/* <Modal
        opened={opened}
        onClose={close}
        title="EMI Calculator"
        size="700px"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        classNames={{ body: classes.modalBody, title: classes.modalTitle }}
      >
        Track your EMI, interest, and how your loan principal reduces over time.
        <Stack gap="md">
          <NumberInput
            label="Loan Amount (₹)"
            value={loanAmount}
            onChange={(val) => setLoanAmount(Number(val) || 0)}
            min={1000}
            step={1000}
          />
          <NumberInput
            label="Annual Interest Rate (%)"
            value={interestRate}
            onChange={(val) => setInterestRate(Number(val) || 0)}
            min={0.1}
            max={30}
            step={0.1}
          />
          <NumberInput
            label="Tenure (Years)"
            value={tenureYears}
            onChange={(val) => setTenureYears(Number(val) || 0)}
            min={1}
            max={40}
          />

          <Group justify="center" mt="md">
            <Button color="green" onClick={calculateEMI}>
              Calculate EMI
            </Button>
          </Group>

          {emi !== null && totalInterest !== null && totalPayment !== null && (
            <>
              <Card withBorder shadow="sm" radius="md" className={classes.resultCard}>
                <Title order={4}>Loan Details</Title>

                <Text>
                  EMI: ₹{emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </Text>
                <Text>
                  Total Interest: ₹
                  {totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </Text>
                <Text>
                  Total Payment: ₹
                  {totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </Text>

                <div className={classes.chartGrid}>
                  <Chart
                    options={doughnutOptions}
                    series={[loanAmount, totalInterest]}
                    type="donut"
                    height={250}
                  />

                  <Chart
                    options={lineOptions}
                    series={[
                      {
                        name: "Outstanding Principal",
                        data: yearlyRemaining,
                      },
                    ]}
                    type="line"
                    height={250}
                  />
                </div>
              </Card>
            </>
          )}
        </Stack>
      </Modal> */}

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="90%"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        classNames={{ body: classes.modalBody, title: classes.modalTitle }}
      >
        <div className="px-1">
          <Title order={3} className={classes.heading2}>
            EMI Calculator
          </Title>
          <button
            onClick={() => {
              close();
              setEmi(null);
            }}
            className="absolute top-3 right-3 bg-transparent border-0 outline-none shadow-none text-gray-600 hover:text-gray-900 text-lg cursor-pointer"
          >
            X
          </button>
        </div>
        <div className={classes.container}>
          <Text className={classes.subtext}>
            Track your EMI, interest, and how your loan principal reduces over
            time.
          </Text>
          <Divider className={classes.divider} />

          <Stack gap="md" className={classes.inputSection}>
            <Group className={classes.inputSection3}>
              <NumberInput
                label="Loan Amount (₹)"
                value={loanAmount}
                onChange={(val) => {
                  setLoanAmount(Number(val) || 0);
                  setEmi(null);
                }}
                min={1000}
                step={1000}
              />
              <NumberInput
                label="Interest Rate (%"
                value={interestRate}
                onChange={(v) => {
                  setInterestRate(Number(v));
                  setEmi(null);
                }}
              />
              <NumberInput
                label="Tenure (Years)"
                value={tenureYears}
                onChange={(val) => {
                  setTenureYears(Number(val) || 0);
                  setEmi(null);
                }}
                min={1}
                max={40}
              />
            </Group>

            <Group justify="center" mt="md" className={classes.inputSections}>
              <Button
                color="green"
                onClick={calculateEMI}
                className={classes.mainButton}
              >
                CALCULATE
              </Button>
            </Group>
          </Stack>

          {emi !== null && totalInterest !== null && totalPayment !== null && (
            <div className={classes.resultSection}>
              <Card
                withBorder
                shadow="sm"
                radius="md"
                className={classes.resultCard}
              >
                <Title order={2} className={classes.heading2}>
                  Loan Summary
                </Title>

                <div className={classes.summary}>
                  <div className={classes.summaryItem}>
                    <strong>EMI</strong>
                    <span>
                      ₹{" "}
                      {emi.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className={classes.summaryItem}>
                    <strong>Total Interest</strong>
                    <span>
                      ₹
                      {totalInterest.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className={classes.summaryItem}>
                    <strong>Total Payment</strong>
                    <span>
                      ₹
                      {totalPayment.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>

                <div className={classes.chartGrid}>
                  <Chart
                    options={doughnutOptions}
                    series={[loanAmount, totalInterest]}
                    type="donut"
                    height={250}
                  />

                  <Chart
                    options={lineOptions}
                    series={[
                      {
                        name: "Outstanding Principal",
                        data: yearlyRemaining,
                      },
                    ]}
                    type="line"
                    height={250}
                  />
                </div>
              </Card>
              <div className="text-gray-600 text-center">
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

export default EMICalculator;
