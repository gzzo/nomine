import _ from 'lodash'

export const withParams = (
  route: string,
  params: { [key: string]: string | number }
): string => {
  return _.reduce(
    params,
    (res, val, key) => _.replace(res, `:${key}`, val.toString()),
    route
  )
}
