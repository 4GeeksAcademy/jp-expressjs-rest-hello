import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository" bring a database table associated with the object
import { Users } from './entities/Users'
import { Exception } from './utils'
import { People } from './entities/People'
import { Planets } from './entities/Planets'
import { request } from 'http'
import { Favorites } from './entities/Favorites'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getPeople = async (req: Request, res: Response): Promise<Response> =>{
	const people = await getRepository(People).find();
	return res.json(people);
}

export const getPeopleId = async (req: Request, res: Response): Promise<Response> =>{
	const peopleId = await getRepository(People).findOne(req.params.id);
	if (!peopleId) throw new Exception('People id not found');
	return res.json(peopleId);
}

export const getPlanet = async (req: Request, res: Response): Promise<Response> =>{
	const planets = await getRepository(Planets).find();
	return res.json(planets);
}

export const getPlanetId = async (req: Request, res: Response): Promise<Response> =>{
	const planetId = await getRepository(Planets).findOne(req.params.id);
	if (!planetId) throw new Exception('Planet id not found');
	return res.json(planetId);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const getUsersFavorites = async (req: Request, res: Response): Promise<Response> =>{
	const userId = await getRepository(Users).findOne(req.user?.user_id, {relations: ["favorites", "favorites.people", "favorites.planets"]});
	if (!userId) throw new Exception('User id not found');
	return res.json(userId.favorites);
}

export const addFavoritePlanet = async (req: Request, res: Response): Promise<Response> =>{
	const userId = await getRepository(Users).findOne(req.user?.user_id);
	if (!userId) throw new Exception('User id not found');

	const planetId = await getRepository(Planets).findOne(req.params.id);
	if (!planetId) throw new Exception('Planet id not found');

	const favorite = new Favorites();
	favorite.users = userId;
	favorite.planets = planetId;

	await getRepository(Favorites).save(favorite);

	return res.json(favorite);
}

export const addFavoritePeople = async (req: Request, res: Response): Promise<Response> =>{
	const userId = await getRepository(Users).findOne(req.user?.user_id);
	if (!userId) throw new Exception('User id not found');

	const peopleId = await getRepository(People).findOne(req.params.id);
	if (!peopleId) throw new Exception('People id not found');

	const favorite = new Favorites();
	favorite.users = userId;
	favorite.people = peopleId;

	await getRepository(Favorites).save(favorite);

	return res.json(favorite);
}

export const deleteFavoritePlanet = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            throw new Error('User ID not found');
        }

        const planetId = req.params.id;
        if (!planetId) {
            throw new Error('Planet ID not found');
        }

        const user = await getRepository(Users).findOne({ where: { id: userId }, relations: ['favorites'] });
        if (!user) {
            throw new Error('User not found');
        }

        const planet = await getRepository(Planets).findOne({ where: { id: planetId }, relations: ['users'] });
        if (!planet) {
            throw new Error('Planet not found');
        }

        const favorite = await getRepository(Favorites).findOne({ where: { users: userId, people: planetId } });
        if (!favorite) {
            throw new Error('Favorite not found');
        }

        await getRepository(Favorites).remove(favorite);

        return res.json({ message: 'Favorite deleted successfully', favorite });
    } catch (error) {
		return res.status(500).json({ error: (error as Error).message });    }
};

export const deleteFavoritePeople = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            throw new Error('User ID not found');
        }

        const peopleId = req.params.id;
        if (!peopleId) {
            throw new Error('People ID not found');
        }

        const user = await getRepository(Users).findOne({ where: { id: userId }, relations: ['favorites'] });
        if (!user) {
            throw new Error('User not found');
        }

        const people = await getRepository(People).findOne({ where: { id: peopleId }, relations: ['users'] });
        if (!people) {
            throw new Error('People not found');
        }

        const favorite = await getRepository(Favorites).findOne({ where: { users: userId, people: peopleId } });
        if (!favorite) {
            throw new Error('Favorite not found');
        }

        await getRepository(Favorites).remove(favorite);

        return res.json({ message: 'Favorite deleted successfully', favorite });
    } catch (error) {
		return res.status(500).json({ error: (error as Error).message });    }
};