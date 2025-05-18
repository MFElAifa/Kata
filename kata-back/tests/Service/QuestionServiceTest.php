<?php 

namespace App\Tests\Service;

use App\Entity\Question;
use App\Service\QuestionService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPUnit\Framework\TestCase;

class QuestionServiceTest extends TestCase
{
    private $em;
    private $service;

    protected function setUp(): void
    {
        $this->em = $this->createMock(EntityManagerInterface::class);
        $this->service = new QuestionService($this->em);
    }

    public function testAddQuestion(): void
    {
        $this->em->expects($this->once())->method('persist');
        $this->em->expects($this->once())->method('flush');

        $question = $this->service->addQuestion('Test question');
        $this->assertInstanceOf(Question::class, $question);
        $this->assertEquals('Test question', $question->getName());
    }

    public function testEditQuestionSuccess(): void
    {
        $question = new Question();
        $question->setName('Old');

        $repo = $this->createMock(EntityRepository::class);
        $repo->method('find')->willReturn($question);
        $this->em->method('getRepository')->willReturn($repo);
        $this->em->expects($this->once())->method('flush');

        $updated = $this->service->editQuestion(1, 'Updated question');
        $this->assertInstanceOf(Question::class, $updated);
        $this->assertEquals('Updated question', $updated->getName());
    }

    public function testEditQuestionNotFound(): void
    {
        $repo = $this->createMock(EntityRepository::class);
        $repo->method('find')->willReturn(null);
        $this->em->method('getRepository')->willReturn($repo);

        $result = $this->service->editQuestion(999, 'Test');
        $this->assertFalse($result);
    }

    public function testDeleteQuestionSuccess(): void
    {
        $question = new Question();
        $repo = $this->createMock(EntityRepository::class);
        $repo->method('find')->willReturn($question);
        $this->em->method('getRepository')->willReturn($repo);

        $this->em->expects($this->once())->method('remove')->with($question);
        $this->em->expects($this->once())->method('flush');

        $result = $this->service->deleteQuestion(1);
        $this->assertTrue($result);
    }

    public function testDeleteQuestionNotFound(): void
    {
        $repo = $this->createMock(EntityRepository::class);
        $repo->method('find')->willReturn(null);
        $this->em->method('getRepository')->willReturn($repo);

        $result = $this->service->deleteQuestion(999);
        $this->assertFalse($result);
    }
}
