import { Header, SearchForm, Input, Button } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const Searchbar = ({ getName }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    const { name } = data;
    if (!name.trim()) {
      return;
    }
    getName(name.trim().toLowerCase());
    reset();
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit" aria-label="search">
          <BsSearch />
        </Button>

        <Input
          defaultValue=""
          {...register('name')}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  getName: PropTypes.func.isRequired,
};

export default Searchbar;
