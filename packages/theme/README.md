# Mailchimp Opencommerce integration for Vue Storefront 2

![VSF](https://camo.githubusercontent.com/c4e2538e4945cebfe0eefeacb3af4c6b07a3ccc000d6a79297e36110b8fb6a90/68747470733a2f2f626c6f672e76756573746f726566726f6e742e696f2f77702d636f6e74656e742f75706c6f6164732f323032302f30312f31515539463668516c467948734a496273646d743646412e706e67)

This project is a Mailchimp Opencommerce integration for Vue Storefront 2.
This integration is being developed by [Pon Digital Solutions](https://github.com/pondigitalsolutions)

<a href = "https://github.com/pondigitalsolutions/opencommerce-integration-vsf/contributors">
  <img src="https://contrib.rocks/image?repo=pondigitalsolutions/opencommerce-integration-vsf"/>
</a>

Made with [contributors-img](https://contrib.rocks).

## Before you start
You need to install the Vue Storefront CLI to start the import of the template

```sh
yarn global add @vue-storefront/cli
```

After the installation you can run the following command to get started:
```sh
vsf init <project_name>
```

During the init it asks for a integration. Choose `custom integration` and provide the url of this repository. You're all set to go!

Starting the integration after initialization:

```sh
cd <project_name> && yarn install && yarn dev
```


## Contributing?

Requirements:
- NodeJS v14 or up
- Opencommerce >= 3.x

## Steps:

1. Fork the repository
2. Clone your fork
```sh
git clone https://github.com/pondigitalsolutions/opencommerce-integration-vsf
```
3. Checkout the `development` branch (`git checkout developement`)
4. Run `yarn install` to install the dependencies
5. Export the API url of opencommerce
```sh
export OC_API_URI="<api_uri>"
```
6. Build the project `yarn build`
7. Run the project in development `yarn dev`

## Resources
- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)

