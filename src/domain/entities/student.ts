import { Entity } from "../../core/entities/entity"

interface StudentsProps {
    name: string,
    content: string
}

export class Students extends Entity<StudentsProps>{    
}