import React from "react";

interface table {
  number: number;
  description?: string;
  restaurant_name: string;
  palce?: string;
  sendTo?: string;
  code?: string;
  restaurant_id: string;
}

//todo: add tables like waiters, and useContext array for all tables

export default function Tables() {
  return <div>tables</div>;
}
