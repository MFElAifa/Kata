<?php 

namespace App\Tests\Service;

use App\Entity\Question;
use App\Entity\Survey;
use App\Service\SurveyService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPUnit\Framework\TestCase;

class SurveyServiceTest extends TestCase
{
    public function testCreateSurveyFromValidData(): void
    {
        $question = $this->getQuestion('Test Question');

        // Mock  a repository Question
        $questionRepository = $this->createMock(EntityRepository::class);
        $questionRepository->method('find')->willReturn($question);

        $em = $this->getMockEntityManager($questionRepository);
        $em->expects($this->exactly(2))->method('persist');

        $surveyService = new SurveyService($em);

        $data = [
            'note' => 7,
            'responses' => [
                [
                    'question' => 1,
                    'response' => 'Very satisfied',
                ],
            ],
        ];

        $survey = $surveyService->createSurveyFromData($data);

        $this->assertInstanceOf(Survey::class, $survey);
        $this->assertEquals(7, $survey->getNote());
        $this->assertCount(1, $survey->getCustomResponses());
    }


    public function testCreateSurveyWithInvalidResponse(): void
    {
        // Mock  a repository Question
        $questionRepository = $this->createMock(EntityRepository::class);
        $questionRepository->expects($this->never())->method('find');

        $em = $this->getMockEntityManager($questionRepository);
        $em->expects($this->once())->method('persist');

        $surveyService = new SurveyService($em);

        // invalid Data
        $data = [
            'note' => 4,
            'responses' => [
                [ 'question' => 1 ]
            ],
        ];

        $survey = $surveyService->createSurveyFromData($data);

        $this->assertInstanceOf(Survey::class, $survey);
        $this->assertEquals(4, $survey->getNote());
        $this->assertCount(0, $survey->getCustomResponses());
    }

    private function getQuestion(string $name): Question
    {
        $question = new Question();
        $question->setName($name);

        return $question;
    }

    // Mock EntityManager
    private function getMockEntityManager($questionRepository): EntityManagerInterface
    {
        $em = $this->createMock(EntityManagerInterface::class);
        $em->method('getRepository')->willReturn($questionRepository);
        return $em;
    }
}
