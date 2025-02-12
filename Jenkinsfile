
pipeline {
    agent any

    environment {
        IMAGE_NAME = "cypress-allure"
        CONTAINER_NAME = "cypress-test-run"
        ALLURE_RESULTS = "allure-results"
        ALLURE_REPORT = "allure-report"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch:"main",url:'https://github.com/ayoubasmahri/cypress-gitlab'  // Update with your GitLab/GitHub repo
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Run Cypress Tests in Docker') {
            steps {
                script {
                    sh """
                        docker run --name ${CONTAINER_NAME} ${IMAGE_NAME}
                    """ 
                }
            }
        }

        stage('Copy Allure Report') {
            steps {
                script {
                    sh "docker cp ${CONTAINER_NAME}:/app/allure-results ./allure-results"
                }
            }
        }

        
        stage('Stop & Remove Container') {
            steps {
                script {
                    sh "docker rm -f ${CONTAINER_NAME}"
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Archive Allure Report') {
            steps {
                archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }

    }

    

