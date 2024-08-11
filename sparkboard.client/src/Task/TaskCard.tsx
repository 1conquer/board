import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type TaskCardProps = {
  isOpen: boolean;
};

export default class TaskCard extends React.Component<TaskCardProps> {
  constructor(props: TaskCardProps) {
    super(props);

    this.state = { isOpen: false };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {}

  // Мы закрываем выпадающий список по таймеру setTimeout.
  // Это нужно чтобы для дочерних элементов событие выделения
  // происходило перед событием получения фокуса.
  onBlurHandler() {}
  // Не закрывать выпадающий список при получении фокуса дочерним элементом.
  onFocusHandler() {}
  render() {
    // React помогает нам благодаря всплытию потери фокуса и
    // фокусировке событий на родителе.
    return (
      <Box
        boxShadow={3}
        sx={{
          borderRadius: "0.5rem",
          Width: 150,
          Height: 200,
          marginBottom: "0.5rem",
        }}
      >
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                bessssss
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
    );
  }
}
