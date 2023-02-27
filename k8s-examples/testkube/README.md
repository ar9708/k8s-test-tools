
# Deploying the `testkube` Framework to AWS EKS

## How to Deploy and Verify, Step by Step

*Prerequisites:* Have the EKS cluster, Nginx Ingress Controller, and DNS configuration, and ACK Service Controllers for
RDS/S3 set up per the instructions in the [root README.md](../../README.md).

Change directory to `./k8s-examples/testkube/`, modify the `testkube-values.yaml` manifest by replacing all occurrences
of app domain `"testkube.k8s.mabl.se"` with your own domain name, then install Testkube using its Helm chart:

    cd k8s-examples/testkube/
    vi testkube-values.yaml
    helm repo add kubeshop https://kubeshop.github.io/helm-charts && helm repo update
    helm install --create-namespace testkube kubeshop/testkube --namespace=testkube --values testkube-values.yaml

Create a GitHub OAuth application per the
[OAuth for Testkube Dashboard](https://kubeshop.github.io/testkube/guides/getting-to-production/authentication/oauth-ui)
instruction and upgrade the Helm installation with the new values:

    export GH_OAUTH2_CLIENT_ID=61****************22
    export GH_OAUTH2_CLIENT_SECRET=7a1**********************************501
    export GH_OAUTH2_GITHUB_ORG=MyUserOrg
    export GH_OAUTH2_COOKIE_SECRET=$(openssl rand -hex 16)
    helm upgrade testkube kubeshop/testkube --namespace=testkube --values testkube-values.yaml \
      --set testkube-dashboard.oauth2.enabled=true \
      --set testkube-dashboard.oauth2.env.clientId=$GH_OAUTH2_CLIENT_ID \
      --set testkube-dashboard.oauth2.env.clientSecret=$GH_OAUTH2_CLIENT_SECRET \
      --set testkube-dashboard.oauth2.env.githubOrg=$GH_OAUTH2_GITHUB_ORG \
      --set testkube-dashboard.oauth2.env.cookieSecret=$GH_OAUTH2_COOKIE_SECRET \
      --set testkube-dashboard.oauth2.env.cookieSecure="true"

Open the address in your browser and expect to be faced with a GitHub authentication screen and, upon authenticating,
find yourself redirected to the Testkube dashboard (example URL [works for me](https://testkube.k8s.mabl.se/)):

    open https://testkube.k8s.mabl.se/

Now go celebrate! :boom:


