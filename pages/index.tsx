import { Octokit } from '@octokit/rest'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { octokit } from '../lib/octokit'
import Layout from '../src/components/Layout'

interface Doc {
    type: string;
    size: number;
    name: string;
    path: string;
    content?: string | undefined;
    sha: string;
    url: string;
    git_url: string | null;
    html_url: string | null;
    download_url: string | null;
    _links: {
        git: string;
        html: string;
        self: string;
    };
}

interface Props {
  docs: Doc[]
}

const Home = ({docs}: Props) => {
  return (
    <Layout>
      <div className='py-12'>
        <div className='container mx-auto'>
          <h1 className='text-center'>My NoteBook</h1>
          <div className='text-center'>マイノート</div>
          <div className='text-center'>
            <a href='https://github.com/S-Akinori/my-notebook' target="_blank">GitHub</a>にpushしたマークダウンドキュメントが見れます
          </div>
        </div>
        <div className='container py-8 mx-auto'>
          <ul>
          {docs && docs.map(doc => (
            <li key={doc.name}><Link href={doc.name}>{doc.name}</Link></li>
          ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: process.env.NEXT_PUBLIC_GITHUB_OWNER as string,
    repo: 'my-notebook',
    path: ''
  })
  const docs = res.data;
  return {
    props: {
      docs
    }
  }
}