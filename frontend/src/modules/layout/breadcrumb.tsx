import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BreadcrumbWrapper, BreadLink, BreadSpliter } from './style'
import { formatMessage } from '@utils'

interface ICrumb {
  link: string
  name: string
}

interface IProps {
  spilter?: string
}

const renderBreadcrumb = (pathname: string) => {
  const crumbs: ICrumb[] = []

  pathname
    .split('/')
    .filter(path => !!path)
    .forEach((path, index) => {
      if (index === 0) {
        crumbs.push({
          link: `/${path}`,
          name: `menu.${path}`
        })
      } else {
        const { link: parentLink, name: parentName } = crumbs[index - 1]
        crumbs.push({
          link: `${parentLink}/${path}`,
          name: `${parentName}_${path}`
        })
      }
    })

  return crumbs
}

const Breadcrumb = ({ spilter = '/' }: IProps) => {

  const { pathname } = useLocation()
  const [crumbs, setCrumbs] = useState<ICrumb[]>([])

  useEffect(() => {
    const renderCrumbs = renderBreadcrumb(pathname)
    setCrumbs(renderCrumbs)
  }, [pathname])

  return (
    <BreadcrumbWrapper>
      {
        crumbs.map((crumb, index) => {
          const { link, name } = crumb
          return (
            index === 0 ?
              <BreadLink
                current={index === crumbs.length - 1}
                to={link}
                key={index}>
                {formatMessage(name)}
              </BreadLink> :
              <>
                <BreadSpliter>
                  {spilter}
                </BreadSpliter>
                <BreadLink
                  current={index === crumbs.length - 1}
                  to={link}
                  key={index}>
                  {formatMessage(name)}
                </BreadLink>
              </>
          )
        })
      }
    </BreadcrumbWrapper>
  )
}

export default Breadcrumb