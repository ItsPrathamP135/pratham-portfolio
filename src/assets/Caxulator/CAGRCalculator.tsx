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

const CAGRCalculator = () => {
    
  const [opened, { open, close }] = useDisclosure(false);

  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(200000);
  const [years, setYears] = useState(5);

  const [cagr, setCAGR] = useState<number | null>(null);

  const calculateCAGR = () => {
    const rate = Math.pow(finalValue / initialValue, 1 / years) - 1;
    setCAGR(rate * 100);
  };

  const yearlyValues = Array.from(
    { length: years },
    (_, i) => initialValue * Math.pow(1 + (cagr || 0) / 100, i + 1)
  );

  const lineOptions: ApexOptions = {
    chart: { id: "cagr-chart", toolbar: { show: false } },
    xaxis: {
      categories: Array.from({ length: years }, (_, i) => `Year ${i + 1}`),
      labels: { style: { colors: "#555" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${((val as number) / 1000).toFixed(0)}k`,
      },
    },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#2e7d32"],
    grid: { borderColor: "#e0e0e0", strokeDashArray: 4 },
    tooltip: {
      y: { formatter: (val: number) => `₹${val.toLocaleString("en-IN")}` },
    },
    legend: { position: "top" },
  };

  const doughnutOptions: ApexOptions = {
    chart: { type: "donut" },
    labels: ["Investment", "Gains"],
    colors: ["#1b5e20", "rgb(60, 120, 110)"],
    legend: { position: "bottom", horizontalAlign: "center", offsetY: 0 },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#fff"] },
    },
    tooltip: {
      y: { formatter: (val: number) => `₹${val.toLocaleString("en-IN")}` },
    },
    responsive: [
      {
        breakpoint: 768,
        options: { chart: { height: 250 }, legend: { fontSize: "10px" } },
      },
    ],
  };

  const gains = finalValue - initialValue;

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
          CAGR CALCULATOR
        </Title>
        <Text size="sm" className={classes.subTitle} mt={5}>
          Calculate Compound Annual Growth Rate of your investment.
        </Text>
      </Card>

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
          <Title order={2} className={classes.heading2}>
            Compound Annual Growth Rate(CAGR) Estimator
          </Title>
          <button
            onClick={() => {
              close();
              setCAGR(null);
            }}
            className="absolute top-3 right-3 bg-transparent border-0 outline-none shadow-none text-gray-600 hover:text-gray-900 text-lg cursor-pointer"
          >
            X
          </button>
        </div>
        <div className={classes.container}>
          <Text className={classes.subtext}>
            Measure your investment’s real long-term growth with a clean and
            simple CAGR insight.
          </Text>
          <Divider className={classes.divider} />

          <Stack gap="md" className={classes.inputSection}>
            <Group className={classes.inputSection3}>
              <NumberInput
                label="Initial Investment (₹)"
                value={initialValue}
                onChange={(val) => {
                  setInitialValue(Number(val) || 0);
                  setCAGR(null);
                }}
                min={1000}
                step={1000}
              />
              <NumberInput
                label="Final Value (₹)"
                value={finalValue}
                onChange={(val) => {
                  setFinalValue(Number(val) || 0);
                  setCAGR(null);
                }}
                min={1000}
                step={1000}
              />
              <NumberInput
                label="Duration (Years)"
                value={years}
                onChange={(val) => {
                  setYears(Number(val) || 0);
                  setCAGR(null);
                }}
                min={1}
                max={50}
              />
            </Group>

            <Group justify="center" mt="md" className={classes.inputSections}>
              <Button
                size="md"
                onClick={calculateCAGR}
                className={classes.mainButton}
              >
                CALCULATE
              </Button>
            </Group>
          </Stack>

          {cagr !== null && (
            <div className={classes.resultSection}>
              <Card
                withBorder
                shadow="sm"
                radius="md"
                className={classes.resultCard}
              >
                <Title order={2} className={classes.heading2}>
                  CAGR Summary
                </Title>
                <div className={classes.summary}>
                  <div className={classes.summaryItem}>
                    <strong>CAGR</strong>
                    <span>{cagr.toFixed(2)}%</span>
                  </div>
                  <div className={classes.summaryItem}>
                    <strong>Total Gains</strong>
                    <span>₹{gains.toLocaleString("en-IN")}</span>
                  </div>
                  <div className={classes.summaryItem}>
                    <strong>Total Value</strong>
                    <span>₹{finalValue.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className={classes.chartGrid}>
                  <Chart
                    options={doughnutOptions}
                    series={[initialValue, gains]}
                    type="donut"
                    height={250}
                  />
                  <Chart
                    options={lineOptions}
                    series={[{ name: "Value over Years", data: yearlyValues }]}
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

export default CAGRCalculator;
