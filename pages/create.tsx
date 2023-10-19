import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma'
import { AuthorProps } from '../components/Post';

export const getStaticProps: GetStaticProps = async () => {
    const users = await prisma.user.findMany({
        select: { name: true, email: true },
    });

    return {
        props: { users },
        revalidate: 10
    }
}

type Props = {
    users: AuthorProps[]
}

const Draft: React.FC<Props> = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { title, content, author };
            await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await Router.push('/drafts');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('author', author);
    }, [author]);

    return (
        <Layout>
            <div>
                <form onSubmit={submitData}>
                    <h1>New Draft</h1>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                    />
                    <textarea
                        cols={50}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        rows={8}
                        value={content}
                    />
                    <input disabled={!content || !title} type="submit" value="Create" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                    <div>
                        <select name="select-users" id="select-users" onChange={(e) => setAuthor(e.target.value)} >
                            <option value={null}>Pick an Author</option>
                            {props.users.map((user) => (
                                <option key={user.email} value={user.email}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>
            <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
        </Layout>
    );
};

export default Draft;