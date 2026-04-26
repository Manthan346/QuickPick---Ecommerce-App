import React from 'react'
import { Card, CardContent } from './ui/card'

function DataCard({ img, data, text }) {
    return (
        <div>
            <Card className="bg-background  hover:shadow-2xl ">
                <CardContent className=" ">
                    <div className="grid grid-cols-1 gap-2 ">

                        <div className="w-10 h-10 border-2 rounded-full flex items-center justify-center">
                            {img}
                        </div>


                        <div>
                            <h3 className="text-xl">{data}</h3>
                        </div>


                        <div>
                            <p className="text-foreground/50">{text}</p>
                        </div>


                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default DataCard