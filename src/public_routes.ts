
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import * as actions from './actions';


const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(createUser));

// gets all people and also people by id
router.get('/people', safe(actions.getPeople));
router.get('/people/:id', safe(actions.getPeopleId));

// get all planets and also planet by id
router.get('/planet', safe(actions.getPlanet));
router.get('/planet/:id', safe(actions.getPlanetId));

export default router;
