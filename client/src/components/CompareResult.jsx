import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CompareResults = ({ comparisonResult }) => {
  // Check if the comparisonResult is defined and contains the expected structure
  const { comparison } = comparisonResult || {};

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Comparison Results</Typography>
        {comparison ? (
          <Typography variant="body1">
            {JSON.stringify(comparison, null, 2)} {/* Example of rendering object */}
          </Typography>
        ) : (
          <Typography variant="body1">No results available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CompareResults;