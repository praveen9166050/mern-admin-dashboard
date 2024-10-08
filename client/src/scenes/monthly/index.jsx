import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import Header from "components/Header";
import { useMemo } from "react";
import { useGetSalesQuery } from "state/api";

function Monthly() {
  const theme = useTheme();
  const {data, isLoading} = useGetSalesQuery();
  const [formattedData] = useMemo(() => {
    if (!data) {
      return [];
    }
    const {monthlyData} = data.overallStats;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: []
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: []
    };
    Object.values(monthlyData).forEach(({month, totalSales, totalUnits}) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        {x: month, y: totalSales}
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        {x: month, y: totalUnits}
      ];
    });
    const formattedData = [totalSalesLine, totalUnitsLine]
    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(formattedData);
  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Monthly SALES" subtitle="Chart of monthly sales." />
      <Box height="75vh">
        {(isLoading || !data) ? (
          <>Loading...</>
        ) : (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200]
                  }
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200]
                  }
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1
                  },
                  text: {
                    fill: theme.palette.secondary[200]
                  }
                }
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200]
                }
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main
                }
              }
            }}
            colors={{datum: "color"}}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false
            }}
            yFormat=" >-.2f"
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: 'middle',
              truncateTickAt: 0
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: 'middle',
              truncateTickAt: 0
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        )}
      </Box>
    </Box>
  )
}

export default Monthly