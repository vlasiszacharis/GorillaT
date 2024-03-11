import React from "react";
import { MdMapsHomeWork } from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { VictoryPie } from "victory";
function Dashboard() {
  const data = [
    { supplier: 1, value: 5000 },
    { supplier: 2, value: 3000 },
    { supplier: 3, value: 6000 },
    { supplier: 4, value: 2500 },
    { supplier: 5, value: 4500 },
  ];
  const data1 = [
    { category: "Meats", amount: 35 },
    { category: "Vegetables", amount: 25 },
    { category: "Spices", amount: 15 },
    { category: "Dairy", amount: 10 },
    { category: "Beverages", amount: 15 },
  ];
  return (
    <>
      <div className="flex flex-col h-screen ">
        <div className="flex flex-row justify-between items-center p-6 pr-16 font-manrope font-bold text-xl">
          <h2 className="text-3xl font-bold">Botrini's</h2>
        </div>

        <div className="grid p-2 gap-8 mr-6 ml-6 grid-cols-3 items-start justify-center flex-grow">
          <div className="col-span-2 flex flex-col justify-start items-center gap-8">
            <div className="flex flex-row gap-8">
              {" "}
              <div className="p-1  py-4 w-1/2 bg-white rounded-3xl shadow-md flex flex-col items-center justify-center text-lg font-semibold">
                <h2>Value per Supplier</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={60}
                  height={350}
                  width={550}
                >
                  <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={[
                      "Supplier 1",
                      "Supplier 2",
                      "Supplier 3",
                      "Supplier 4",
                      "Supplier 5",
                    ]}
                    style={{
                      tickLabels: { fontSize: 15, padding: 5 },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `$${x}`}
                    style={{
                      tickLabels: { fontSize: 15, padding: 5 },
                    }}
                  />
                  <VictoryBar
                    data={data}
                    x="supplier"
                    y="value"
                    barWidth={50}
                    style={{ data: { fill: "#2f53da" } }}
                  />
                </VictoryChart>
              </div>{" "}
              <div className="p-1  py-4 w-1/2 bg-white rounded-3xl shadow-md flex flex-col items-center justify-center text-lg font-semibold">
                <h2>Kitchen Stock Categories</h2>
                <VictoryPie
                  data={data1}
                  x="category"
                  y="amount"
                  height={350}
                  width={550}
                  colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                  style={{
                    labels: { fontSize: 14, fill: "white" },
                  }}
                />
              </div>
            </div>
            <div className="w-full p-8 py-12 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center text-lg font-semibold">
              <div className="flex flex-col gap-2 p-2">
                <h3>Fast Actions</h3>
                <div className="flex flex-row gap-4">
                  <button>PDF</button>
                  <button>scan</button>
                  <button>PAY</button>
                  <button>order</button>
                  <button>Low stock</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-8 gap-6 rounded-3xl">
            <div className="flex-grow p-6 py-10  bg-white rounded-xl shadow-md">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Total Stock Value</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className="bg-blue-100 w-10 h-10 rounded flex justify-center items-center">
                    <MdMapsHomeWork className="text-custom-navy flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">14.518 $</div>
                </div>
              </div>
            </div>
            <div className="flex-grow p-6 py-10  bg-white rounded-xl shadow-md">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Total Revenue</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-yellow-100 h-10 rounded flex justify-center items-center">
                    <TbCoins className="text-yellow-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">67.254 $</div>
                </div>
              </div>
            </div>

            <div className="flex-grow p-6 py-10  bg-white rounded-xl shadow-md">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Active Recipes</h4>
                <div className="flex flex-row items-center gap-4">
                  <div className="bg-green-100 w-10 h-10 rounded flex justify-center items-center">
                    <FaBook className="text-green-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">26</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
