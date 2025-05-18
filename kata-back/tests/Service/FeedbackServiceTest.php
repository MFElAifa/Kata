<?php 


namespace App\Tests\Service;

use App\Entity\Feedback;
use App\Service\FeedbackService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class FeedbackServiceTest extends TestCase
{
    public function testCreateFeedbackFromValidData(): void
    {
        $em = $this->createMock(EntityManagerInterface::class);

        $em->expects($this->once())->method('persist')
            ->with($this->isInstanceOf(Feedback::class));

        $em->expects($this->once())->method('flush');

        $feedbackService = new FeedbackService($em);

        $data = [
            'firstName' => 'John',
            'lastName' => 'Doe',
            'email' => 'john@doe.com',
            'comment' => 'Comment Comment Comment Comment !!'
        ];

        $feedback = $feedbackService->createFeedbackFromData($data);
        $this->assertEquals("John", $feedback->getFirstname());
        $this->assertEquals("Doe", $feedback->getLastName());
        $this->assertEquals("john@doe.com", $feedback->getEmail());
    }


    public function testCreateFeedbackFromInvalidData(): void
    {
        $em = $this->createMock(EntityManagerInterface::class);

        $em->expects($this->never())->method('persist');
        $em->expects($this->never())->method('flush');

        $feedbackService = new FeedbackService($em);

        $invalidData = [
            'firstName' => 'Jane',
            'email' => 'jane@example.com',
            'comment' => 'Missing lastname.'
        ];

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Missing required feedback fields.');

        $feedbackService->createFeedbackFromData($invalidData);
    }
}
