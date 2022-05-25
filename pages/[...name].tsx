import { Octokit } from '@octokit/rest'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Prism from 'prismjs'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { octokit } from '../lib/octokit'
import Layout from '../src/components/Layout'
import { Tree } from '../src/types/Tree'
import Markdown from '../src/components/parts/Markdown'
import { useRouter } from 'next/router'
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
  docs: Doc[] | Doc
}

const Home = ({docs}: Props) => {
  const router = useRouter()
  const [prev, setPrev] = useState('/')
  const { name } = router.query
  useEffect(() => {
    Prism.highlightAll()
    if(Array.isArray(name)) {
      const prevPath = name.slice(0, name.length - 1).length > 0 ? name.slice(0, name.length - 1).join('/') : '/'
      console.log(prevPath)
      setPrev(prevPath)
    }
  }, [docs])
  return (
    <Layout>
      <div className='py-12'>
        <div className='container px-4 mx-auto'>
          <div><Link href={prev}>&lt;戻る</Link></div>
          {Array.isArray(docs) && ( 
            <ul>
            { docs.map(doc => (
              <li key={doc.name}><Link href={doc.path}>{doc.name}</Link></li>
            ))}
            </ul>
          )}
          {!Array.isArray(docs) && docs.content && (
            <>
              <Markdown>{docs.content}</Markdown>
              <div><Link href={prev}>&lt;戻る</Link></div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Home

interface Params extends ParsedUrlQuery {
  name: string[]
}
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const res = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{branch}?recursive=1', {
    owner: 'S-Akinori',
    repo: 'my-notebook',
    branch: 'main'
  })
  const trees = res.data.tree as Tree[]
  const paths = trees.map(tree => ({
    params: {name: tree.path.split('/')}
  }))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const name = params?.name as string[]
  const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: process.env.NEXT_PUBLIC_GITHUB_OWNER as string,
    repo: 'my-notebook',
    path: name.join('/')
  })
  const docs = res.data as Doc[] | Doc;
  if(!Array.isArray(docs) && docs.content) {
    docs.content = Buffer.from(docs.content, 'base64').toString()
  }
  return {
    props: {
      docs
    }
  }
}