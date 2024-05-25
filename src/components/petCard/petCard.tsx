import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import React from "react";

export function PetCard() {
    return (
        <Card>
            <CardContent>
                <div className="flex justify-between items-center">
                    <Image alt='Logo'
                           src='/images/others/cachorro-caramelo.jpg'
                           width={70}
                           height={70}/>
                    <p></p>
                    <Button>Opções</Button>
                </div>
            </CardContent>
        </Card>
    )
}