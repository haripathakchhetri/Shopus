export const notAllowed = (req, res) => {
  return res.status(405).json({ msg: "http method not allowed" })
}