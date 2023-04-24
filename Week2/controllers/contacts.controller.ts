import { Request, Response } from "express"
import { ContactsService } from "../services/contacts.service"

export class ContactsController {
    constructor(
        private contactService: ContactsService
     ){}

    getAll = async (req: Request, res: Response) => {
        const allContacts = await this.contactService.getAll();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(allContacts))
    }
    
    findByID = async (req: Request, res: Response)=>{
        const contact = await this.contactService.findByID(req.params.id);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(contact))
    }
}

