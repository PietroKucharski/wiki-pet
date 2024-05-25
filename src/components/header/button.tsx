import {
    Clipboard,
    DogIcon,
    LifeBuoy,
    LogOut,
    MenuIcon,
    Settings,
    User,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useRouter} from "next/navigation"
import React from "react";
import Image from "next/image";

export function Header() {
    const router = useRouter()

    return (
        <header className="flex justify-between items-center px-4 bg-primary h-16 mb-4">
            <Image alt='Logo'
                   src='/images/logos/logo.png'
                   width={70}
                   height={70}/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="top-3 left-5">
                        <MenuIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={() => {
                                router.replace("/cadastro/conta/entrar")
                            }}
                        >
                            <User className="mr-2 h-4 w-4"/>
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <DogIcon className="mr-2 h-4 w-4"/>
                            <span>Pet</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4"/>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Clipboard className="mr-2 h-4 w-4"/>
                            <span>History</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4"/>
                        <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4"/>
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}
