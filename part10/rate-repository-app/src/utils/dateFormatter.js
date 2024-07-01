import format from 'date-fns/format';

const formatDate = (date) => {
  return format(date, 'MM.dd.yyyy');
};

export default formatDate;
