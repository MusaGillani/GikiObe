import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ChartCardPLODean from "./ChartCardPLODean";
import { useEffect, useState } from "react";
export default function ChartsGridDean() {
  const [batch28, setBatch28] = useState({});
  const [batch29, setBatch29] = useState({});
  const [batch30, setBatch30] = useState({});

  useEffect(() => {
    fetch(`${process.env.backend_url}/plo-performance/28`)
      .then((res) => res.json())
      .then((data) => {
        setBatch28(data);
      });
    fetch(`${process.env.backend_url}/plo-performance/29`)
      .then((res) => res.json())
      .then((data) => {
        setBatch29(data);
      });
    fetch(`${process.env.backend_url}/plo-performance/30`)
      .then((res) => res.json())
      .then((data) => {
        setBatch30(data);
      });
  }, []);

  return (
    <div>
      <Container>
        {console.log(batch28)}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <ChartCardPLODean values={batch28} batch={28} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ChartCardPLODean values={batch29} batch={29} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ChartCardPLODean values={batch30} batch={30} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
