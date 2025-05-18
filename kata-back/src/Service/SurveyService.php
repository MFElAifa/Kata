<?php


namespace App\Service;

use App\Entity\Survey;
use App\Entity\CustomResponse;
use App\Entity\Question;
use Doctrine\ORM\EntityManagerInterface;

class SurveyService
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function getAllQuestions(): array
    {
        $questions = $this->em->getRepository(Question::class)->findAll();
        $data = array_map(fn($question) => [
            'id' => $question->getId(),
            'name' => $question->getName(),
        ], $questions);
        return $data;
    }

    public function getSurveys(): array
    {
        $surveys = $this->em->getRepository(Survey::class)->findAll();
        $data = array_map(fn($survey) => [
            'id' => $survey->getId(),
            'note' => $survey->getNote(),
            'customResponses' => array_map(fn($customResponse) => [
                'question' =>  $customResponse->getQuestion()->getName(),
                'response' =>  $customResponse->getResponse()
            ], $survey->getCustomResponses()->toArray())
        ], $surveys);
        return $data; 
    }

    public function createSurveyFromData(array $data): Survey
    {
        $survey = new Survey();
        $survey->setNote($data['note'] ?? 0);

        $responses = $data['responses'] ?? [];

        foreach ($responses as $response) {
            if (!$this->isValidResponse($response)) {
                continue;
            }

            $question = $this->em->getRepository(Question::class)->find($response['question']);
            if (!$question) {
                continue;
            }

            $customResponse = (new CustomResponse())
                ->setQuestion($question)
                ->setResponse($response['response']);

            $this->em->persist($customResponse);

            $survey->addCustomResponse($customResponse);
        }

        $this->em->persist($survey);
        $this->em->flush();

        return $survey;
    }

    /**
     * @param array $response
     * @return bool
     */
    private function isValidResponse(array $response): bool
    {
        return isset($response['question'], $response['response']);
    }
}
