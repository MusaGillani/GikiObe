import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ChartCardPLO from "./ChartCardPLO";
import ChartCardCLO from "./ChartCardCLO";
import { ChartCardMid } from "./ChardCardMid";
import { ChartCardLatest } from "./ChartCardLatest";
export default function ChartsGrid() {
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <ChartCardPLO />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ChartCardCLO />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ChartCardMid />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ChartCardLatest />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
