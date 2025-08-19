import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type ServicesCardProps = {
  title: string;
  description: string;
};

export const ServicesCard = ({ title, description }: ServicesCardProps) => {
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};
