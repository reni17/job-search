import axios from "axios";

const fetch1 = axios.get("http://localhost:3000/jobs").then((res) => {
  this.jobs = res.data;
});

const fetch2 = async () => {
  const res = await axios.get(" http://localhost:3000/jobs");
  console.log(res.data);
};

fetch2();
