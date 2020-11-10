import React, {useState} from 'react'
import './styling/displaycard.css'
import TinderCard from 'react-tinder-card'

function DisplayCard() {
    const [people, setPeople] = useState([
        {
            name: "person One",
            url: "https://images.unsplash.com/photo-1586257097150-4d26a156d5ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
        },
        {
            name: "person Two",
            url: "https://images.unsplash.com/photo-1559554609-1361c33dd382?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
            name: "person Three",
            imgUrl: "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        },
        {
            name: "person Four",
            imgUrl: "https://images.unsplash.com/photo-1558220829-f1856c69ee83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
            name: "person Five",
            imgUrl: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        }
    ])

    const swiped = (direction, nameToDelete) => {
        console.log("removing" + nameToDelete)
        // setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + "left the screen")
    }

    return (
        <div className="displayCards">
            <div className="displayCards__cardContainer">
                {people.map( person =>(
                    <TinderCard 
                    className="swipe"
                    key={person.name}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <div 
                        style={{backgroundImage:`url(${person.url})`}}
                        className="card"
                        >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            
            
        </div>
    )
}

export default DisplayCard
