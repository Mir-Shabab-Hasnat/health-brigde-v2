
import React from "react";
import { Badge } from "./badge";


// Function to determine color based on the number value
const getNumberColor = (num: number): "gray" | "yellow" | "violet" => {
  if (num <= 30) return "gray";
  if (num > 30 && num < 60) return "yellow";
  return "violet";
};

const SeverityBadge = ({ number }: { number: number }) => {
  const color = getNumberColor(number);
  return <Badge color={color}>{number}</Badge>;
};

export default SeverityBadge;