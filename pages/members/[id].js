import { useRouter } from 'next/router';
import Link from "next/link";

function Member({ member }) {
    const router = useRouter();

    // Format the date of birth in the required format
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(member.dob.date));

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="member-card">
            <h1>{`${member.name.first} ${member.name.last}`}</h1>
            <img src={member.picture.large} alt={`${member.name.first} ${member.name.last}`} />
            <p>{member.location.street.number} {member.location.street.name}</p>
            <p>{`${member.location.city}, ${member.location.state} ${member.location.postcode}`}</p>
            <p>{member.email}</p>
            <p>{member.phone}</p>
            <p>{formattedDate}</p> {/* Display the formatted date here */}
            <Link href="/" legacyBehavior>
                <a className="back-button">Back</a>
            </Link>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://randomuser.me/api/?results=100')
    const data = await res.json()

    const paths = data.results.map(member => ({
        params: { id: member.login.uuid }
    }))

    return {
        paths,
        fallback: "blocking"
    }
}

export async function getStaticProps({ params }) {
    console.log(params);
    const res = await fetch(`https://randomuser.me/api/?seed=${params.id}`)
    const data = await res.json();
    console.log(data.results[0]);
    return {
        props: {
            member: data.results[0],
        },
    };
}


export default Member;
