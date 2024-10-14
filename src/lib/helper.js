
import { BellIcon, Calendar, Settings, ToggleRightIcon, User } from 'lucide-react'

export const navLinks = [
    {
        id : 0,
        name : "theme toggle",
        icon : <ToggleRightIcon/>
    },
    {
        id : 1,
        name : "notification",
        icon : <BellIcon/>
    },
    {
        id : 2,
        name : "calender",
        icon : <Calendar/>
    },
    {
        id : 3,
        name : "analytics",
        icon : <Settings/>
    },{
        id : 4,
        name  : "user",
        icon : <User/>
    }
]