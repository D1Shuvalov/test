import {FC, useMemo, useState} from 'react';
import {ResponsiveLine} from '@nivo/line';
import {DAYS_COUNT} from "../../const/const";
import {formatCurrency} from "../../utils/formatCurrency";
import {getFilter} from "../../store/selectors/selectors";
import {useAppSelector} from "../../hooks/reduxHooks";
import {
  Button,
  ButtonContainer,
  ChartContainer,
  FieldInformation,
  Title,
  TooltipStyle
} from './Chart.styled';


interface ChartData {
  date: string;
  cost: number;
}

export const Chart: FC<{ data: ChartData[] }> = ({data}) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const filters = useAppSelector(getFilter);


  const sortedData = useMemo(
    () => [...data].sort((prev, next) => new Date(prev.date).getTime() - new Date(next.date).getTime()),
    [data]
  );

  const visibleData = useMemo(
    () => sortedData.slice(startIndex, startIndex + DAYS_COUNT),
    [sortedData, startIndex]
  );

  const chartData = [
    {
      id: 'Cost',
      data: visibleData.map(item => ({
        x: item.date,
        y: item.cost
      }))
    }
  ];

  const isFirstPage = startIndex === 0;
  const isLastPage = startIndex + DAYS_COUNT >= data.length;


  const handleNext = () => {
    if (startIndex + DAYS_COUNT < data.length) {
      setStartIndex((prevIndex) => prevIndex + DAYS_COUNT);
    }
  };

  const handlePrevious = () => {
    if (startIndex - DAYS_COUNT >= 0) {
      setStartIndex((prevIndex) => prevIndex - DAYS_COUNT);
    }
  };

  const filterKey = `${filters.type}-${filters.model}-${startIndex}`;


  return (
    <ChartContainer>
      <Title>DAILY COST</Title>
      <ResponsiveLine
        key={filterKey}
        data={chartData}
        margin={{top: 30, right: 60, bottom: 100, left: 60}}
        xScale={{type: 'point'}}
        yScale={{type: 'linear', min: 0, max: 'auto'}}
        axisBottom={{
          tickValues: 'every 1 days',
          tickRotation: 45,
          tickSize: 10,
          tickPadding: 10,
          legend: 'DATE',
          legendOffset: 55,
          legendPosition: 'middle',
          renderTick: ({x, y, value}) => (
            <text
              x={x}
              y={y + 30}
              textAnchor="middle"
              style={{
                fontSize: '12px',
                fill: '#4a4a4a',
              }}
            >
              {value}
            </text>
          ),
        }}
        axisLeft={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 3,
          legend: 'COST',
          legendOffset: -50,
          legendPosition: 'end',
          renderTick: ({x, y, value}) => (
            <text
              x={x}
              y={y + 12}
              textAnchor="middle"
              style={{
                fontSize: '12px',
                fill: '#4a4a4a',
              }}
            >
              {formatCurrency(value)}
            </text>
          ),
        }}
        lineWidth={3}
        enablePoints={true}
        useMesh={true}
        tooltip={({point}) => {
          const cost = Number(point.data.y);
          return (
            <TooltipStyle>
              <FieldInformation>DATE {point.data.xFormatted}</FieldInformation>
              <FieldInformation>
                COST: {formatCurrency(cost)}
              </FieldInformation>
            </TooltipStyle>
          );
        }}
        pointSize={8}
        pointColor="green"
        pointBorderWidth={2}
        pointBorderColor="green"
        colors="green"
        animate={true}
        motionConfig="gentle"
      />
      <ButtonContainer>
        <Button onClick={handlePrevious} disabled={isFirstPage}>
          PREVIOUS
        </Button>
        <Button onClick={handleNext} disabled={isLastPage}>
          NEXT
        </Button>
      </ButtonContainer>
    </ChartContainer>
  );
};

