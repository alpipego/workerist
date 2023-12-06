# Workerist

Workerist is a Cloudflare Worker designed to serve as a private Composer repository, utilizing Cloudflare's R2 storage for package distribution and Cloudflare Workers KV for authentication. This solution allows you to securely distribute PHP packages across your projects without setting up a dedicated package repository server.

## Getting Started

### Prerequisites

- Cloudflare account with access to Workers and R2 storage
- `wrangler` CLI installed (refer to the [Wrangler documentation](https://developers.cloudflare.com/workers/cli-wrangler/install-update))
- Node.js and npm

### Setup

1. **Clone the repository:**

```shell
git clone https://github.com/alpipego/workerist.git
```

2. **Navigate to the project directory:**

```shell
cd workerist
```

3. **Install dependencies:**

```shell
npm install
```

4. **Configuration:**

Copy the `wrangler.toml.example` file to `wrangler.toml`:

```shell
cp wrangler.toml.example wrangler.toml
```

Edit `wrangler.toml` and add the `kv_namespace` ID and the R2 bucket name to the appropriate fields.

### Deployment

Deploy the worker using the `wrangler` CLI:

```shell
wrangler deploy
```

## Usage

Configure your Composer projects to use this worker as a private repository. For detailed instructions on the setup and use, please refer to our in-depth [blog post](https://www.alexandergoller.com/journal/14687/serving-private-composer-packages-with-serverless-cloudflare-workers-and-r2-storage/).

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to discuss potential improvements or features.

## License

This project is open-sourced under the MIT License - see the [LICENSE](LICENSE) file for details.

## Additional Resources

- For a comprehensive guide on setting up and using this worker, please refer to our detailed [blog post](https://www.alexandergoller.com/journal/14687/serving-private-composer-packages-with-serverless-cloudflare-workers-and-r2-storage/).
- Check out the [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/) for more information on developing workers.
- Learn more about Cloudflare's [R2 Storage](https://developers.cloudflare.com/r2/) and [Workers KV](https://developers.cloudflare.com/kv/).
