import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

let url = 'https://leetcode.cn/graphql/noj-go/';
let graphqlQuery = {
  query:
    '\n    query userProfileCalendar($userSlug: String!, $year: Int) {\n  userCalendar(userSlug: $userSlug, year: $year) {\n    streak\n    totalActiveDays\n    submissionCalendar\n  }\n}\n    ',
  variables: { userSlug: 'younglina' },
}
const options = {
  method: 'POST',
  url,
  headers: {},
  data: graphqlQuery,
};

axios.request(options).then(res => {
  const data = res.data.data;
  const __dirname = path.resolve()
  const filePath = path.resolve(
    __dirname,
    `docs/.vitepress/components/lcData.json`
  );
  fs.writeFileSync(
    filePath,
    JSON.stringify(data),
    {
      encoding: 'utf8',
    }
  );
})
