app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    message: err.message || "Internal Server Error"
  });
});