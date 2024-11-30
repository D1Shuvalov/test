import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {setTypeFilter, setModelFilter} from '../../features/filters/filterSlice';
import {Select} from 'antd';
import {getFilter} from "../../store/selectors/selectors";
import {ModelFilter, TypeFilter} from "../../const/enum";
import {FiltersContainer, SelectWrapper} from "./Filter.styled";

const {Option} = Select;

export const Filters = () => {
  const dispatch = useAppDispatch();
  const {type, model} = useAppSelector(getFilter);

  return (
    <FiltersContainer>
      <SelectWrapper>
        <Select
          value={type || ''}
          onChange={(value) => dispatch(setTypeFilter(value || null))}
          style={{
            width: 200,
          }}
          placeholder="Select Type"
        >
          <Option value={TypeFilter.ALL}>ALL TYPES</Option>
          <Option value={TypeFilter.FIRST}>FIRST</Option>
          <Option value={TypeFilter.SECOND}>SECOND</Option>
        </Select>
      </SelectWrapper>
      <SelectWrapper>
        <Select
          value={model || ''}
          onChange={(value) => dispatch(setModelFilter(value || null))}
          style={{
            width: 200,
          }}
          placeholder="Select Model"
        >
          <Option value={ModelFilter.ALL}>ALL MODELS</Option>
          <Option value={ModelFilter.MODEL1}>MODEL 1</Option>
          <Option value={ModelFilter.MODEL2}>MODEL 2</Option>
        </Select>
      </SelectWrapper>
    </FiltersContainer>
  );
};

