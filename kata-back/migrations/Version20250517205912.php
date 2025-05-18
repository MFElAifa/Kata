<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250517205912 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE custom_response (id INT AUTO_INCREMENT NOT NULL, survey_id INT DEFAULT NULL, question_id INT DEFAULT NULL, response VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', updated_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', INDEX IDX_DBA9EC9FB3FE509D (survey_id), INDEX IDX_DBA9EC9F1E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE custom_response ADD CONSTRAINT FK_DBA9EC9FB3FE509D FOREIGN KEY (survey_id) REFERENCES survey (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE custom_response ADD CONSTRAINT FK_DBA9EC9F1E27F6BF FOREIGN KEY (question_id) REFERENCES question (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE custom_response DROP FOREIGN KEY FK_DBA9EC9FB3FE509D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE custom_response DROP FOREIGN KEY FK_DBA9EC9F1E27F6BF
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE custom_response
        SQL);
    }
}
