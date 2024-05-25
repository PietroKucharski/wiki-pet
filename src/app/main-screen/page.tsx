"use client"

import {Header} from "@/components/header/button";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function MainPage() {
    return (
        <>
            <Header/>
            <main>
                <div className="flex justify-between px-8">
                    <h1>Meus pets</h1>
                    <Button>
                        <PlusIcon/>
                    </Button>
                </div>
                <div>
                    <Card>
                        <CardContent>
                            <div>
                                <Image alt='Logo'
                                       src='/images/others/cachorro-caramelo.jpg'
                                       width={70}
                                       height={70}/>
                                <p></p>
                                <Button>Opções</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    botões
                </div>
            </main>
        </>
    )
}