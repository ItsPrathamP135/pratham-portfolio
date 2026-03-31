import { useState } from "react";
import {
  Modal,
  Button,
  NumberInput,
  TextInput,
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

const DreamGoalCalculator = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [goalName, setGoalName] = useState("Dream Home");
  const [currentCost, setCurrentCost] = useState(1000000);
  const [inflationRate, setInflationRate] = useState(6);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const [results, setResults] = useState<{
    futureValue: number;
    sipInflated: number;
    sipWithoutInflation: number;
    totalInvestedWithInflation: number;
    totalInvestedWithoutInflation: number;
    profitWithInflation: number;
    profitWithoutInflation: number;
    inflationLoss: number;
  } | null>(null);

  const calculateGoal = () => {
    const fv = currentCost * Math.pow(1 + inflationRate / 100, years);
    const r = expectedReturn / 100 / 12;
    const n = years * 12;

    const sipInflated = (fv * r) / (Math.pow(1 + r, n) - 1);

    const sipWithoutInflation =
      (currentCost * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));

    const totalInvestedWithInflation = sipInflated * n;
    const totalInvestedWithoutInflation = sipWithoutInflation * n;

    const profitWithInflation = fv - totalInvestedWithInflation;
    const profitWithoutInflation = currentCost - totalInvestedWithoutInflation;

    const inflationLoss = fv - currentCost;

    setResults({
      futureValue: fv,
      sipInflated,
      sipWithoutInflation,
      totalInvestedWithInflation,
      totalInvestedWithoutInflation,
      profitWithInflation,
      profitWithoutInflation,
      inflationLoss,
    });
  };

  const donutOptions = (
    title: string,
    totalValue: number,
    labels: string[],
    colors: string[]
  ): ApexOptions => ({
    labels,
    colors,
    legend: { position: "bottom" },
    dataLabels: { enabled: true },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: title,
              formatter: () => `₹${totalValue.toLocaleString("en-IN")}`,
            },
          },
        },
      },
    },
  });

  const format = (num: number) => `₹${num.toLocaleString("en-IN")}`;

  return (
    <>
      {/* Main Card */}
      <Card
        withBorder
        shadow="md"
        radius="md"
        p="lg"
        onClick={open}
        className={classes.card}
      >
        <Title order={4} className={classes.title}>
          DREAM GOAL CALCULATOR</Title>
        <Text size="sm" className={classes.subTitle} mt={5}>
          Plan your dream goal and required investment.
        </Text>
      </Card>

      {/* Modal */}

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
            Dream Goal Estimator
          </Title>
          <button
            onClick={() => {
              close();
              setResults(null);
            }}
            className="absolute top-3 right-3 bg-transparent border-0 outline-none shadow-none text-gray-600 hover:text-gray-900 text-lg cursor-pointer"
          >
            X
          </button>
        </div>

        <div className={classes.container}>
          <Text className={classes.subtext}>
            Calculate how much you’ll need to invest to reach your dream goal.
          </Text>

          <Divider className={classes.divider} />

          <Stack gap="md" className={classes.inputSection}>
            <TextInput
              label="Goal Name"
              placeholder="e.g., Dream Home, Child’s Education, Vacation"
              value={goalName}
              onChange={(e) => {
                setGoalName(e.currentTarget.value);
                setResults(null);
              }}
            />
            <NumberInput
              label="Current Cost of Goal (₹)"
              value={currentCost}
              onChange={(val) => {
                setCurrentCost(Number(val) || 0);
                setResults(null);
              }}
              min={1000}
            />
            <Group className={classes.inputSection3}>
              <NumberInput
                label="Expected Inflation Rate (%)"
                value={inflationRate}
                onChange={(val) => {
                  setInflationRate(Number(val) || 0);
                  setResults(null);
                }}
                min={0}
                max={20}
                step={0.5}
              />
              <NumberInput
                label="Years to Achieve Goal"
                value={years}
                onChange={(val) => {
                  setYears(Number(val) || 1);
                  setResults(null);
                }}
                min={1}
                max={50}
              />
              <NumberInput
                label="Expected Annual Return (%)"
                value={expectedReturn}
                onChange={(val) => {
                  setExpectedReturn(Number(val) || 0);
                  setResults(null);
                }}
                min={1}
                max={30}
                step={0.5}
              />
            </Group>

            <Group justify="center" mt="md" className={classes.inputSections}>
              <Button
                color="green"
                size="md"
                onClick={calculateGoal}
                className={classes.mainButton}
              >
                CALCULATE
              </Button>
            </Group>
          </Stack>

          {results && (
            <div className={classes.chartGrid}>
              {/* Without Inflation */}
              <Card
                withBorder
                shadow="sm"
                radius="md"
                className={classes.resultCard}
              >
                <Title order={2} className={classes.heading2}>
                  {goalName}
                  (Without Inflation)
                </Title>
                <div
                  className={`text-[rgba(4,47,72,1)] mt-1 mb-1 text-center ${classes.inputSection}`}
                >
                  <Text>
                    <strong>Monthly Investment:</strong> <br></br>
                    {format(results.sipWithoutInflation)}
                  </Text>
                  <Text>
                    <strong>Total Invested:</strong> <br></br>
                    {format(results.totalInvestedWithoutInflation)}
                  </Text>
                  <Text>
                    <strong>Expected Profit:</strong> <br></br>
                    {format(results.profitWithoutInflation)}
                  </Text>
                  <Text>
                    <strong>Current Goal Value:</strong> <br></br>
                    {format(currentCost)}
                  </Text>
                </div>

                <div className={classes.chartContainer}>
                  <Chart
                    options={donutOptions(
                      "Without Inflation",
                      currentCost,
                      ["Investment", "Profit"],
                      [ "rgb(60, 120, 110)", "#81c784"]
                    )}
                    series={[
                      results.totalInvestedWithoutInflation,
                      results.profitWithoutInflation,
                    ]}
                    type="donut"
                    height={280}
                  />
                </div>
              </Card>
              {/* With Inflation */}
              <Card
                withBorder
                shadow="sm"
                radius="md"
                className={classes.resultCard}
              >
                <Title order={2} className={classes.heading2}>
                  {goalName}
                  (With Inflation)
                </Title>
                <div
                  className={`text-[rgba(4,47,72,1)] mt-1 mb-1 text-center ${classes.inputSection}`}
                >
                  {" "}
                  <Text>
                    <strong>Monthly Investment:</strong> <br></br>
                    {format(results.sipInflated)}
                  </Text>
                  <Text>
                    <strong>Total Invested:</strong> <br></br>
                    {format(results.totalInvestedWithInflation)}
                  </Text>
                  <Text>
                    <strong>Expected Profit:</strong> <br></br>
                    {format(results.profitWithInflation)}
                  </Text>
                  <Text>
                    <strong>Future Goal Value:</strong> <br></br>
                    {format(results.futureValue)}
                  </Text>
                </div>

                <div className={classes.chartContainer}>
                  <Chart
                    options={donutOptions(
                      "With Inflation",
                      results.futureValue,
                      ["Investment", "Profit", "Inflation Loss"],
                      ["#2e7d32",  "rgb(60, 120, 110)", "#d32f2f"]
                    )}
                    series={[
                      results.totalInvestedWithInflation,
                      results.profitWithInflation,
                      results.inflationLoss,
                    ]}
                    type="donut"
                    height={280}
                  />
                </div>
              </Card>
              <div className={`text-gray-600 text-center ${classes.inputSections}`}>
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

export default DreamGoalCalculator;
