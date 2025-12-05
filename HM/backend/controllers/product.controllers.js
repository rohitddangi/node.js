export const createProductController = async (req, res) => {
  try {
    res.send("okk me agyaa..");
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
