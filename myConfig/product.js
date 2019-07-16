import ApiConfig from './api.config'

export default function (i18n) {
    return [
        {
            name: i18n.t('product.otc'),
            href: ApiConfig.otcDomain
        },
        {
            name: i18n.t('product.spot'),
            href: ApiConfig.spotDomain
        },
        {
            name: i18n.t('product.swap'),
            href: ApiConfig.swapsDomain
        },
        {
            name: i18n.t('product.lab'),
            href: 'https://margin.58coin.com/'
        },
        {
            name: i18n.t('product.loan'),
            href: ApiConfig.loanDomain
        },
        {
            name: '58B',
            href: ApiConfig.mainDomain + '58BTopics'
        },
        {
          name: i18n.t('product.agent'),
          href: ApiConfig.mainDomain + 'agent/index'
        },
        {
            name: i18n.t('product.hash'),
            href: ApiConfig.hashDomain
        }
    ]
}
