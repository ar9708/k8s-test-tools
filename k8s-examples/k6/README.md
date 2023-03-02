
# Deploying the k6 Operator and Running Distributed Tests on AWS EKS

## How to Deploy and Verify, Step by Step

*Prerequisites:* Have the EKS cluster set up per the instructions in the [root README.md](../../README.md).

The steps below summarizes the [Running distributed k6 tests on Kubernetes](https://k6.io/blog/running-distributed-tests-on-k8s/#deploying-the-operator)
tutorial.

Change directory to `./k8s-examples/k6/`, clone the `grafana/k6-operator` repo, and deploy the k6 operator:

    cd k8s-examples/k6/
    git clone https://github.com/grafana/k6-operator && cd k6-operator
    make deploy

Change directory back to `./k8s-examples/k6/` and create a `ConfigMap` with the first stress test:

    cd ../
    kubectl create configmap k6-crocodile-stress-test --from-file k6-crocodile-stress-test.js

Execute the load test by applying the `k6-crocodile-stress-test.yml` job manifest:

    kubectl apply -f k6-crocodile-stress-test.yml

Ensure that the test has started and that there are 4 test jobs running:

    kubectl get k6 && kubectl get jobs

Re-run `"kubectl get jobs"` until they are completed and terminated. Then create and execute a more heavily distributed
load test:

    kubectl create configmap k6-watch-news-video --from-file k6-watch-news-video.js
    kubectl apply -f k6-watch-news-video.yml

Follow the test execution using `k9s` and command-line:

    kubectl get k6 && kubectl get jobs && kubectl top pod && kubectl get pods
