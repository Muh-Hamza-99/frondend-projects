import { Card, CardContent, Typography } from "@material-ui/core";

import "./Infobox.css";

const InfoBox = ({ title, cases, total, active, isRed, ...props }) => {
  return (
    <Card onClick={props.onClick} className={`infobox ${active && "infobox-selected"} ${isRed && "infobox-red"}`}>
      <CardContent>
        <Typography className="infobox-title" color="textSecondary">{title}</Typography>
        <h2 className={`infobox-cases ${!isRed && "infobox-cases-green"}`}>{cases}</h2>
        <Typography className="infobox-total" color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
