import randomSeed from './random';

const generateDate = ({
  random,
  year = 2017,
  month = rand => Math.floor(rand() * 12),
  day = rand => Math.floor(rand() * 30) + 1,
}) => {
  const getPart = part => (typeof part === 'function' ? part(random) : part);
  const date = new Date(Date.UTC(getPart(year), getPart(month), getPart(day)));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const globalSalesValues = {
  region: ['Asia', 'Europe', 'North America', 'South America', 'Australia', 'Africa'],
  sector: ['Energy', 'Health', 'Manufacturing', 'Insurance', 'Banking', 'Telecom'],
  channel: ['Resellers', 'Retail', 'VARs', 'Consultants', 'Direct', 'Telecom'],
  units: ({ random }) => Math.floor(random() * 4) + 1,
  customer: [
    'Renewable Supplies', 'Energy Systems', 'Environment Solar', 'Beacon Systems', 'Apollo Inc',
    'Gemini Stores', 'McCord Builders', 'Building M Inc', 'Global Services',
    'Market Eco', 'Johnson & Assoc', 'Get Solar Inc', 'Supply Warehouse', 'Discovery Systems', 'Mercury Solar'],
  product: ['SolarMax', 'SolarOne', 'EnviroCare', 'EnviroCare Max'],
  amount: ({ random }) => Math.floor(random() * 10000) + 1000,
  discount: ({ random }) => Math.round(random() * 0.5 * 1000) / 1000,
  saleDate: ({ random }) => generateDate({
    random,
    year: 2016,
    month: () => Math.floor(random() * 3) + 1,
  }),
  shipped: [true, false],
};

export function generateRows({
  columnValues = {},
  length,
  random = randomSeed(329972281),
}) {
  const data = [];
  const columns = Object.keys(columnValues);
  console.log('Columns: ', columnValues)

  for (let i = 0; i < length; i += 1) {
    const record = {};

    columns.forEach((column) => {
      let values = columnValues[column];

      if (typeof values === 'function') {
        record[column] = values({ random, index: i, record });
        return;
      }

      while (values.length === 2 && typeof values[1] === 'object') {
        values = values[1][record[values[0]]];
      }

      const value = values[Math.floor(random() * values.length)];
      if (typeof value === 'object') {
        record[column] = Object.assign({}, value);
      } else {
        record[column] = value;
      }
    });

    data.push(record);
  }

  return data;
}

export function getCourseData(courseId) {
  const data = [];
  for (let i = 1; i <= 10000; i++) {
    for (let j = 1; j <= 4; j++) {
      const row = {
        user_id: i,
        course_week: j,
        num_video_plays: Math.floor(Math.random() * 15),
        num_problems_attempted: Math.floor(Math.random() * 10),
        num_problems_correct: Math.floor(Math.random() * 4),
        num_pages_viewed: Math.floor(Math.random() * 20),
        num_forum_posts: 0,
        predicted_user_dropped_out_next_week: Math.round(Math.random() + 0.1)
      }
      data.push(row);
    }
  }
  return data;
}