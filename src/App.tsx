import {useAppSelector} from './hooks/reduxHooks';
import {useGetUsagesQuery, useGetCostsQuery} from './api/apiSlice';
import {Filters} from './components/Filter/Filter';
import {Chart} from './components/Chart/Chart';
import {calculateCosts} from './utils/calculateCosts';
import {Spinner, WrapperContainer} from "./App.styled";
import {getFilter} from "./store/selectors/selectors";

export const App = () => {
  const {data: usages} = useGetUsagesQuery();
  const {data: costs} = useGetCostsQuery();
  const filters = useAppSelector(getFilter);

  if (!usages || !costs) return <Spinner size="large"/>;


  const chartData = calculateCosts(
    usages,
    costs.map((cost) => ({
      model: cost.model,
      input: cost.input,
      output: cost.output,
    })),
    filters
  );

  return (
    <WrapperContainer>
      <Filters/>
      <Chart data={chartData} />
    </WrapperContainer>
  )
}

