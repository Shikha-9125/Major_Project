export const getSample = (req, res) => {
  res.json({
    message: "Hello from backend!",
    time: new Date().toISOString(),
  });
};
