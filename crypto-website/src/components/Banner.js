import { Container, makeStyles, Typography } from "@material-ui/core";

import Carousel from "./Carousel";

const Banner = () => {
  const useStyles = makeStyles(() => ({
    banner: {
      backgroundImage: "url(./banner.jpg)",
    },
    bannerContent: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Poppins",
            }}
            variant="h2"
          >
            BlockChainDept
          </Typography>
          <Typography
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Poppins",
            }}
            variant="subtitle2"
          >
            Get All The Information About Any Cryptocurrency You Can Imagine Of!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
