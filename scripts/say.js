import serviceAuth from '../utils/service-auth-middleware';

export default robot => {
  robot.router.post('/say/room/:room', serviceAuth, (req, res) => {
    robot.messageRoom(`#${req.params.room}`, req.body.message);
    res.status(201).end();
  });
};
